import { decode } from 'jsonwebtoken'

export default async function (cookie) {
  const str = cookie.substring(5)
  const user = decode(str)

  return user
}