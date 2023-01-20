import ProfileRank from '@/components/profile/ProfileRank'
import ProfileRankMobile from '@/components/profile/ProfileRankMobile'

const Profile: React.FC = () => {

  return (
    <>
      <section className="hidden md:block">
        <ProfileRank />
      </section>
      <section className="block md:hidden">
        <ProfileRankMobile />
      </section>
    </>
  )
}

export default Profile
