export default function Label({ children, className = '', ...nextProps }) {
    return <label className={`${className}`} {...nextProps}>{children}</label>
}