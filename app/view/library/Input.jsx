export default function Input({ className = '', ...nextProps }) {
    return <input className={`${className}`} {...nextProps} />
}