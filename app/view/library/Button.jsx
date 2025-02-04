export default function Button({ children, className = '', ...nextProps }) {
    return <button className={`${className}`} {...nextProps}>{children}</button>
}