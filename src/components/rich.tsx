export default function Rich({ text }: { text: string }) {
    return <>{text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
        i % 2 ? <strong key={i} className="font-semibold text-ink">{part}</strong> : part)}</>
}