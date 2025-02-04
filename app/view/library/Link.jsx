export default function Link({ children, href, ...nextProps }) {
    return <a href={href} {...nextProps}>{children}</a>
}