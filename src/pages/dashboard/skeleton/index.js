import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const SkeletonComponent = () => {
  return (
    <div className="skeleton-container">
      <SkeletonTheme color="#EEEEEE" highlightColor="#E7E7E7">
        <p>
          <Skeleton height={140} width={700} />
        </p>
      </SkeletonTheme>
      <SkeletonTheme color="#EEEEEE" highlightColor="#E7E7E7">
        <Skeleton height={200} width={400} />
      </SkeletonTheme>
      <SkeletonTheme color="#EEEEEE" highlightColor="#E7E7E7">
        <p>
          <Skeleton height={60} width={300} />
        </p>
      </SkeletonTheme>
      <SkeletonTheme color="#EEEEEE" highlightColor="#E7E7E7">
        <p>
          <Skeleton height={40} width={400} />
        </p>
      </SkeletonTheme>
      <SkeletonTheme color="#EEEEEE" highlightColor="#E7E7E7">
        <p>
          <Skeleton height={40} width={600} />
        </p>
      </SkeletonTheme>
      <SkeletonTheme color="#EEEEEE" highlightColor="#E7E7E7">
        <p>
          <Skeleton height={40} width={200} />
        </p>
      </SkeletonTheme>
    </div>
  );
};

export default SkeletonComponent;
