'use client'

import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'
import { v4 as uuid } from 'uuid'
import { selectUser } from '@/features/user/slice/userSlice'
import { useSelector } from 'react-redux'
import * as dotenv from 'dotenv'

dotenv.config()

const page = ({ params }: { params: { roomID: string } }) => {
  console.log('meeting id: ', params)
  const roomID = params.roomID

  const user = useSelector(selectUser)

  let myMeeting: any = async (element: any) => {

    // generate Kit Token
    const appID = parseInt(process.env.NEXT_PUBLIC_ZEGO_CLOUD_APP_ID!)
    const serverSecret = process.env.NEXT_PUBLIC_ZEGO_CLOUD_SERVER_SECRET
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret!,
      roomID,
      uuid(),
      user.firstName || 'user' + Date.now(),
      720
    )

    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken)
    // start the call
    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: 'Personal link',
          url:
            window.location.protocol + '//' +
            window.location.host + window.location.pathname +
            '?roomID=' +
            roomID,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
    });
  };

  return (
    <div
      ref={myMeeting}
      className='w-full h-full'
    ></div>
  )
}

export default page
