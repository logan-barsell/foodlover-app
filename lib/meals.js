import fs from 'node:fs';
import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';
import { S3 } from '@aws-sdk/client-s3';

const s3 = new S3({
  region: 'us-east-1',
});

const db = sql('meals.db');

const IMG_URL = process.env.APP_ENV === 'production' ? '' : '/images/';

export function getMeals() {
  return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug) {
  return db.prepare(`SELECT * FROM meals WHERE slug = ?`).get(slug);
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split('.').pop();
  const fileName = `${meal.slug}.${extension}`;
  const buffer = await meal.image.arrayBuffer();
  if (process.env.APP_ENV === 'production') {
    const stream = fs.createWriteStream(`public/images/${fileName}`);
    stream.write(Buffer.from(buffer), error => {
      if (error) {
        throw new Error('Saving image failed.');
      }
    });
  } else {
    s3.putObject({
      Bucket: 'foodlover-app-nextjs',
      Key: fileName,
      Body: Buffer.from(buffer),
      ContentType: meal.image.type,
    });
  }
  meal.image = `${IMG_URL}${fileName}`;
  db.prepare(
    `
    INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
      @title, @summary, @instructions, @creator, @creator_email, @image, @slug
    )
    `
  ).run(meal);
}
