import classes from "./style.module.css";

const Loading = () => {
  return (
    <div className={classes.container}>
      <div className={classes.spinner}>
        <div className={classes.rect1}></div>
        <div className={classes.rect2}></div>
        <div className={classes.rect3}></div>
        <div className={classes.rect4}></div>
        <div className={classes.rect5}></div>
      </div>
      加载中
    </div>
  );
};

export default Loading;
