export default function Heading({ level = 1, children, className = '', ...nextProps }) {
    const Tag = `h${level}`
    return <Tag className={`${className}`} {...nextProps}>{children}</Tag>
}