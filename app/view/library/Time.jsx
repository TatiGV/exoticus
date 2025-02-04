export default function Time({ children, className }) {
    return <time className={`block px-[.rem] text-slate-400 text-xs ${className} mb-1 mt-1`}>
        {children}
    </time>;
}