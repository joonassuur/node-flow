const getBgColor = (label: string) => {
  switch (label) {
    case 'youtube':
      return 'bg-red-500';
    case 'docs':
      return 'bg-blue-500';
    case 'summarizer':
      return 'bg-green-500';
    case 'translator':
      return 'bg-yellow-500';
    default:
      return 'bg-white ';
  }
};

export { getBgColor };
