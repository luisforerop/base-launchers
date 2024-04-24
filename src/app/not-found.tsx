import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex items-start justify-center flex-col max-w-[800px]">
      <h1 className="mb-1">Ooops, la página que buscas no existe</h1>
      <p className="text-3xl mb-4">
        Queremos darte herramientas espectaculares.
      </p>
      <p className="text-xl">
        Encuéntralas en el{' '}
        <Link className="underline decoration-solid" href="/">
          Home
        </Link>
      </p>
    </div>
  )
}
