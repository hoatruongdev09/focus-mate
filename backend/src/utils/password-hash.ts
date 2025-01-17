import bcrypt from 'bcrypt'

const saltRound = 10


export const hash = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(saltRound)
    return await bcrypt.hash(password, salt)
}

export const compare = async (password: string, hashedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword)
}