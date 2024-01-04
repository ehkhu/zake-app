import Head from 'next/head'

const GuestLayout = ({ children }: {
    children: React.ReactNode
  }) => {
    return (
        <div>
            <Head>
                <title>Zake</title>
            </Head>

            <div className="font-sans text-gray-900 antialiased">
                {children}
            </div>
        </div>
    )
}

export default GuestLayout
