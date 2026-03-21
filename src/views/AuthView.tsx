import { motion } from 'motion/react'
import { ArrowLeft, CheckCircle2, Store } from 'lucide-react'

type Mode = 'login' | 'register'

type Props = {
  mode: Mode
  email: string
  password: string
  name: string
  onEmailChange: (v: string) => void
  onPasswordChange: (v: string) => void
  onNameChange: (v: string) => void
  onSubmit: (e: React.FormEvent) => void
  onGoogleLogin: () => void
  onBack: () => void
  onToggleMode: () => void
}

export function AuthView({
  mode,
  email,
  password,
  name,
  onEmailChange,
  onPasswordChange,
  onNameChange,
  onSubmit,
  onGoogleLogin,
  onBack,
  onToggleMode
}: Props) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-cream p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl bg-white sketch-border overflow-hidden flex flex-col md:flex-row shadow-[8px_8px_0px_0px_rgba(41,37,36,1)]"
      >
        <div className="w-full md:w-1/2 p-10 md:p-14 flex flex-col justify-center">
          <button
            onClick={onBack}
            className="text-stone-400 hover:text-stone-800 text-sm font-bold flex items-center gap-1 mb-8 transition-colors w-max"
          >
            <ArrowLeft size={16} /> Volver
          </button>

          <div className="mb-10">
            <h2 className="text-4xl font-serif font-bold text-stone-800 mb-2">
              {mode === 'login' ? 'Bienvenido de vuelta.' : 'Únete a la cosecha.'}
            </h2>
            <p className="text-stone-500">
              {mode === 'login'
                ? 'Inicia sesión para continuar comprando o vendiendo.'
                : 'Crea tu cuenta gratis en menos de un minuto.'}
            </p>
          </div>

          <button
            onClick={onGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-white border-2 border-stone-800 py-3.5 mb-6 hover:bg-stone-50 transition-colors shadow-[4px_4px_0px_0px_rgba(41,37,36,0.1)] active:translate-x-1 active:translate-y-1 active:shadow-none"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
            <span className="font-bold text-stone-800">Continuar con Google</span>
          </button>

          <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t-2 border-dashed border-stone-200"></div>
            <span className="flex-shrink-0 mx-4 text-stone-400 text-xs font-bold uppercase tracking-wider">o con email</span>
            <div className="flex-grow border-t-2 border-dashed border-stone-200"></div>
          </div>

          <form onSubmit={onSubmit} className="space-y-5">
            {mode === 'register' && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-1">Nombre</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => onNameChange(e.target.value)}
                  className="w-full px-4 py-3 bg-stone-50 border-2 border-stone-200 focus:border-stone-800 focus:bg-white rounded-none outline-none transition-colors"
                  placeholder="Ej. Juan Pérez"
                />
              </motion.div>
            )}
            <div>
              <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => onEmailChange(e.target.value)}
                className="w-full px-4 py-3 bg-stone-50 border-2 border-stone-200 focus:border-stone-800 focus:bg-white rounded-none outline-none transition-colors"
                placeholder="tucorreo@ejemplo.com"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-1">Contraseña</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => onPasswordChange(e.target.value)}
                className="w-full px-4 py-3 bg-stone-50 border-2 border-stone-200 focus:border-stone-800 focus:bg-white rounded-none outline-none transition-colors"
                placeholder="••••••••"
              />
            </div>

            <button type="submit" className="w-full sketch-button py-3.5 text-lg mt-2">
              {mode === 'login' ? 'Entrar' : 'Registrar'}
            </button>
          </form>

          <p className="mt-8 text-center text-stone-500 text-sm">
            {mode === 'login' ? '¿No tienes cuenta? ' : '¿Ya tienes cuenta? '}
            <button onClick={onToggleMode} className="font-bold text-brand-leaf hover:underline">
              {mode === 'login' ? 'Regístrate aquí' : 'Inicia Sesión'}
            </button>
          </p>
        </div>

        <div className="hidden md:flex w-1/2 bg-brand-olive relative flex-col justify-between p-14 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '32px 32px'
              }}
            ></div>
          </div>
          <div className="relative z-10 flex items-center gap-3 opacity-80">
            <Store size={32} />
            <span className="text-2xl font-serif font-bold tracking-tight">DelHuerto.</span>
          </div>
          <div className="relative z-10">
            <div className="text-brand-sage mb-4">
              <CheckCircle2 size={48} />
            </div>
            <h3 className="text-4xl font-serif italic leading-tight bg-clip-text text-transparent bg-gradient-to-br from-white to-brand-sage mb-6">
              "El mejor marketplace para conectar verdaderamente tu campo con la ciudad"
            </h3>
            <p className="font-bold">Ana M.</p>
            <p className="text-brand-sage text-sm">Productora Local</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

