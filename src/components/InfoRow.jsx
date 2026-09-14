function InfoRow({ icon, text }) {
    return (
        <div className="flex w-full items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-slate-700 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primaryBlue/10 text-lg text-primaryBlue">
                {icon}
            </div>
            <p className="break-all font-medium">{text}</p>
        </div>
    );
}

export default InfoRow;