import Link from 'next/link';
import Image from 'next/image';

import classes from './meal-item.module.css';

export default function MealItem({ title, slug, image, summary, creator }) {
  const IMG_URL_PATH =
    process.env.APP_ENV === 'production'
      ? `https://foodlover-app-nextjs.s3.amazonaws.com/${image}`
      : image;
  return (
    <article className={classes.meal}>
      <header>
        <div className={classes.image}>
          <Image
            src={IMG_URL_PATH}
            alt={title}
            fill
          />
        </div>
        <div className={classes.headerText}>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.summary}>{summary}</p>
        <div className={classes.actions}>
          <Link href={`/meals/${slug}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
}
