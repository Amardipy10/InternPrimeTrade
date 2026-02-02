const Card = ({ children, className = '', hover = false, padding = true }) => {
  return (
    <div
      className={`
        bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50
        ${padding ? 'p-6' : ''}
        ${hover ? 'card-hover' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;
