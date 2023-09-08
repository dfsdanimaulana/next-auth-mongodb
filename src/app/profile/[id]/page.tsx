export default function UserProfile({ params }: any) {
    return (
        <div className='grid place-items-center min-h-screen'>
            <div className='text-center'>
                <h1 className='text-3xl'>Profile</h1>
                <hr />
                <p>Profile page {params.id}</p>
            </div>
        </div>
    )
}
