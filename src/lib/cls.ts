const cls = (...classnames: (string | undefined)[]) => {
  return classnames.join(' ').trim();
};

export default cls;
