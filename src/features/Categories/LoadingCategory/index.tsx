import { Skeleton, Splider } from 'rupor-ui-kit';
import { Paper } from '@/shareds';

const sliders = [...Array(10)].map((_, key) => (
  <Skeleton data-testid={`categories-skeleton-${key}`} className="w-[300px]" key={key} template="card" />
));

export const LoadingCategory = () => (
  <>
    {[...Array(10)].map((_, key) => (
      <Paper data-testid="categories-skeleton-wrapper" key={key} className="overflow-hidden">
        <Skeleton
          style={{
            borderRadius: 16,
            height: 32,
            width: 220,
            marginBottom: 16,
          }}
        />
        <Splider slides={sliders} />
      </Paper>
    ))}
  </>
);
