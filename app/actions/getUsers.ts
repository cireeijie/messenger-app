import prisma from '@/app/libs/prismadb'

import getSession from './getSession'

const getUsers = async () => {
    const session = await getSession()

    if(!session?.user?.email) {
        console.error("No user email")
        return []
    }

    try {
        const users = await prisma.user.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            where: {
                NOT: {
                    email: session.user.email
                }
            }
        })

        return users
    } catch(error: any) {
        console.error('Error fetching:', error)
        return []
    }
}

export default getUsers