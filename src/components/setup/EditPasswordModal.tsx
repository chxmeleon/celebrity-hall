import { useMemo } from 'react'
import { useIntl } from 'react-intl'
import { useMutation } from '@apollo/client'
import { UPDATE_PROFILE } from '@/gql/profile'
import { useSetup } from '@/contexts/SetupContext'
import { LoginButton } from '@/components/common/Button'
import { clsx as cx } from 'clsx'

const EditPasswordModal: React.FC = () => {
  const { isShowEditPassword, closeEditPassword } = useSetup()
  const [updateProfile] = useMutation(UPDATE_PROFILE)
  const { formatMessage } = useIntl()
  const loginFromInput = cx`
    border-0 outline-none focus:border focus:border-theme-300 pl-4 w-full h-10 text-gray-100 rounded-md bg-theme-100
  `

  return (
    <div
      className={`${
        isShowEditPassword ? 'block' : 'hidden'
      } absolute w-full h-full`}
    >
      <div
        onClick={closeEditPassword}
        className="flex overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 justify-center items-center w-full h-full bg-black/80 backdrop-blur-sm"
      >
        <div
          onClick={(e) => {
            e.stopPropagation()
          }}
          className="p-1 md:p-6 m-auto w-4/5 md:w-1/2 h-[79%] bg-gradient-to-br rounded-md border border-theme-300/50 from-theme-50/75 via-theme-75/90 to-theme-50/50 backdrop-blur-md"
        >
          <div className="flex justify-end w-full h-10">
            <button
              onClick={closeEditPassword}
              className="text-2xl i-heroicons-x-circle"
            ></button>
          </div>
          <div className="py-1 text-2xl text-center">
            {formatMessage({
              id: 'screens.profile.editPassword',
              defaultMessage: 'Edit Password'
            })}
          </div>
          <div className="flex justify-center items-start w-full h-4/5">
            <div className="m-auto w-1/2">
              <form className="flex flex-col justify-between h-[15rem]">
                <div className="relative w-full">
                  <input
                    autoComplete="off"
                    type="password"
                    placeholder={formatMessage({
                      id: 'screens.profile.newPassword',
                      defaultMessage: 'Password'
                    })}
                    className={loginFromInput}
                  />
                </div>
                <div className="relative w-full">
                  <input
                    autoComplete="off"
                    type="password"
                    placeholder={formatMessage({
                      id: 'screens.profile.confirmNewPassword',
                      defaultMessage: 'Confirm New Password'
                    })}
                    className={loginFromInput}
                  />
                </div>
                <div className="flex justify-center">
                  <LoginButton onClick={() => null}>
                    <p>
                      {formatMessage({
                        id: 'common.confirm',
                        defaultMessage: 'Confirm'
                      })}
                    </p>
                  </LoginButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditPasswordModal
