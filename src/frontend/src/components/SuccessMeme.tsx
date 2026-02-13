export default function SuccessMeme() {
  return (
    <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8 overflow-hidden rounded-3xl border-4 border-pink-400 shadow-2xl shadow-pink-500/50">
          <img
            src="/assets/generated/valentine-meme.dim_1200x800.png"
            alt="Valentine Success"
            className="max-w-full h-auto"
            style={{ maxHeight: '70vh' }}
          />
        </div>
        <h2 className="neon-text text-4xl font-bold sm:text-5xl md:text-6xl">
          Hehehe Good gurl 😚💗
        </h2>
      </div>
    </div>
  );
}
