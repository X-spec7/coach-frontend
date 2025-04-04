import { EnvelopOpenSvg, PhoneSvg, HouseSvg } from '@/shared/components/Svg'
import { TitleWithEllipsis } from '@/shared/components'
import { ILayoutProps } from '@/shared/types'

const ContactDetailBox: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <div className='flex justify-start items-start gap-3.5'>
      {children}
    </div>
  )
}

const ContactSvgBox: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <div className='flex justify-center items-center w-9.5 h-9.5 rounded-2xl bg-green'>
      {children}
    </div>
  )
}

interface IContactDetailText {
  title: string
  content?: string
}

const ContactDetailText: React.FC<IContactDetailText> = ({ title, content }) => {
  return (
    <div className='flex-1'>
      <p className='text-gray-20 text-xs'>{title}</p>
      <p className='text-black text-sm break-words'>{content}</p> 
    </div>
  )
}

interface IContactProps {
  email: string
  phoneNumber?: string
  address?: string
}

const Contact: React.FC<IContactProps> = ({
  email,
  phoneNumber,
  address
}) => {
  return (
    <div className='flex flex-col w-full gap-3.5'>
      <TitleWithEllipsis title='Contact' />

      {/* EMAIL */}
      <ContactDetailBox>
        <ContactSvgBox>
          <EnvelopOpenSvg width='18' height='18' color='#4D5260' />
        </ContactSvgBox>

        <ContactDetailText title='Email' content={email} />
      </ContactDetailBox>

      {/* PHONE */}
      {
        phoneNumber && phoneNumber.trim() !== '' && (
          <ContactDetailBox>
            <ContactSvgBox>
              <PhoneSvg width='18' height='18' color='#4D5260' />
            </ContactSvgBox>

            <ContactDetailText title='Phone' content={phoneNumber} />
          </ContactDetailBox>
        )
      }

      {/* ADDRESS */}
      <ContactDetailBox>
        <ContactSvgBox>
          <HouseSvg width='18' height='18' color='#4D5260' />
        </ContactSvgBox>

        <ContactDetailText title='Address' content={address} />
      </ContactDetailBox>
    </div>
  )
}

export default Contact
