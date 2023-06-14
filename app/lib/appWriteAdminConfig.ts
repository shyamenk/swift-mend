import sdk from 'node-appwrite'

const client = new sdk.Client()
export const users = new sdk.Users(client)
client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('6479f765ef1e9f6a1b3f')
  .setKey(
    '944b11bf5183f8036cd540f35a2d86e85a3d192c75527388e76419166a28a05c168ebfdbb0eddb5b3f613c94f722cf42c7b58a248eea92cea2f21b8e8209228760d06a8533ac81e640f55d5f5cf52fdb316712364b189c9b29bf508ea1ffd1ab28a1911a56c32c34b6280399ab3e83e00f3a4f2b7779722e41a75254f0e36e53'
  )

// const promise = users.create('[USER_ID]')

// promise.then(
//   function (response) {
//     console.log(response)
//   },
//   function (error) {
//     console.log(error)
//   }
// )
