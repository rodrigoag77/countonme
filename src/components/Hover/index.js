export const Hover = ({ children, className, ...props }) => {
  return (
    <p className={`hover ${className}`} {...props}>
      {children}
    </p>
  )
}