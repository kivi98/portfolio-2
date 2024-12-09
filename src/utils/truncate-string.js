const getTruncatedText = (text, limit) => {
  return text.length > limit ? text.substring(0, limit) + '...' : text;
};

export default getTruncatedText;
