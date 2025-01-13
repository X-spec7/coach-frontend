'use client'

import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'
import { v4 as uuid } from 'uuid'
import { selectUser } from '@/features/user/slice/userSlice'
import { useSelector } from 'react-redux'
import * as dotenv from 'dotenv'
import { useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'

dotenv.config()

function generateToken(tokenServerUrl: string, userID: string) {
  // Obtain the token interface provided by the App Server
  return fetch(
    `${tokenServerUrl}/access_token?userID=${userID}&expired_ts=7200`,
    {
      method: 'GET',
    }
  ).then((res) => res.json());
}

const handleNavigation = (url: string) => {
  window.location.href = url
}


const Page = ({ params }: { params: { roomID: string } }) => {
  const searchParams = useSearchParams()
  const currentChatUserId = searchParams.get('currentChatUserId')

  const roomID = params.roomID

  const meetingInstanceRef = useRef<any>(null)

  const user = useSelector(selectUser)

  let myMeeting: any = async (element: any) => {

    // generate Kit Token
    const appID = parseInt(process.env.NEXT_PUBLIC_ZEGO_CLOUD_APP_ID!)
    const serverSecret = process.env.NEXT_PUBLIC_ZEGO_CLOUD_SERVER_SECRET

    const userId = uuid()

    generateToken('https://nextjs-token.vercel.app/api', userId).then((res) => {
      const token = ZegoUIKitPrebuilt.generateKitTokenForProduction(
        1484647939,
        res.token,
        roomID,
        userId,
        user.firstName || 'user' + Date.now()
      );

      const zp = ZegoUIKitPrebuilt.create(token)

      meetingInstanceRef.current = zp
      // start the call
      zp.joinRoom({
        container: element,
        showPreJoinView: false,
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
        onLeaveRoom: () => {
          handleNavigation(`http://localhost:3000/messages?currentChatUserId=${currentChatUserId}`)
        }
      })
    })

    // const kitToken = ZegoUIKitPrebuilt.generateKitTokenForProduction(
    //   appID,
    //   serverSecret!,
    //   roomID,
    //   uuid(),
    //   user.firstName || 'user' + Date.now(),
    //   // 720
    // )

    // Create instance object from Kit Token.
    // const zp = ZegoUIKitPrebuilt.create(kitToken)
    // const zegoInstanceType = typeof zp
    // console.log('zego instance type: ', zegoInstanceType)
    // meetingInstanceRef.current = zp
    // // start the call
    // zp.joinRoom({
    //   container: element,
    //   showPreJoinView: false,
    //   sharedLinks: [
    //     {
    //       name: 'Personal link',
    //       url:
    //         window.location.protocol + '//' +
    //         window.location.host + window.location.pathname +
    //         '?roomID=' +
    //         roomID,
    //     },
    //   ],
    //   scenario: {
    //     mode: ZegoUIKitPrebuilt.VideoConference,
    //   },
    // })
  }

  useEffect(() => {
    const handleRouteChange = () => {
      if (meetingInstanceRef.current) {
        meetingInstanceRef.current.hangUp();
        // meetingInstanceRef.current.destroy();
        meetingInstanceRef.current = null;
      }
    };

    return () => {
      handleRouteChange()
    };
  }, []);

  return (
    <div
      ref={myMeeting}
      className='w-full h-full'
    ></div>
  )
}

export default Page
