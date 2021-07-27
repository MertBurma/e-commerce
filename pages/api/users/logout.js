import { serialize } from 'cookie'

export default async (req, res) => {
  /* remove cookies from request header */
  res.setHeader('Set-Cookie', serialize('auth', '', {
      maxAge: -1,
      path: '/',
    }),
  )
  res.writeHead(302, { 'Content-Type': 'application/json', 'Accept': 'application/json' })
  res.status(200).json({message: "Successfully Logged out"})
}