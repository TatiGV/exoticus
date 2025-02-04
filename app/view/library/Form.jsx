export default function Form({ children, className = '', ...nextProps }) {
    return <form className={` ${className}`} {...nextProps}>{children}</form>
}