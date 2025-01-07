function XIcon({ className, viewBox }: { className: string | "", viewBox: string | "" }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox={viewBox} stroke-width="1.5" stroke="currentColor" className={className}>
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>

    );
}

export default XIcon;