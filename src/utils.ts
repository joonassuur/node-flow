const getBgColor = (label: string) => {
  switch (label) {
    case 'YouTube':
      return 'bg-red-500';
    case 'Google Docs':
      return 'bg-blue-500';
    case 'Summarizer':
      return 'bg-green-500';
    case 'Translator':
      return 'bg-yellow-500';
    default:
      return 'bg-white ';
  }
};

export { getBgColor };
