import { useMemo } from 'react'
import { useIntl } from 'react-intl'
import { useMutation } from '@apollo/client'
import { UPDATE_PROFILE } from '@/gql/profile'
import { useSetup } from '@/contexts/SetupContext'
import { LoginButton } from '@/components/common/Button'
import { clsx as cx } from 'clsx'
import types from '@/types'
import { useForm } from 'react-hook-form'
import { FormItem } from '../common/Form'
import { v4 as uuidV4 } from 'uuid'
import toast from 'react-hot-toast'
import Modal from '../common/Modal'

const EditNickNameModal: React.FC = () => {
  const { isShowEditNickname, closeEditNickname } = useSetup()
  const [updateProfile] = useMutation<
    types.UPDATE_PROFILE,
    types.UPDATE_PROFILEVariables
  >(UPDATE_PROFILE)

  const { formatMessage } = useIntl()
  const loginFromInput = cx`
    border-0 outline-none focus:border focus:border-theme-300 pl-4 w-full h-10 text-gray-100 rounded-md bg-theme-100
  `

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm()

  const onSubmit = async (data: any) => {
    const { nickname } = data
    try {
      const { data } = await updateProfile({
        variables: {
          input: {
            nickname,
            clientMutationId: uuidV4()
          }
        }
      })
      if (data?.updateProfile?.errors && data.updateProfile.errors.length > 0) {
        for (const error of data.updateProfile.errors) {
          toast.error(error.message)
        }
      } else {
        toast.success(formatMessage({ id: 'actions.updateSuccess' }))
        closeEditNickname()
      }
    } catch (error: any) {
      toast.error(error)
    }
  }

  return (
    <Modal
      isShow={isShowEditNickname}
      onClose={closeEditNickname}
      size="w-4/5 md:w-1/2 h-[79%] "
    >
      <div className="py-1 text-2xl text-center">
        {formatMessage({
          id: 'screens.profile.editNickname',
          defaultMessage: 'Edit Nickname'
        })}
      </div>
      <div className="flex justify-center items-start w-full h-4/5">
        <div className="m-auto w-1/2 min-w-[240px]">
          <form
            className="flex flex-col justify-between"
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormItem>
              <input
                autoComplete="off"
                placeholder={formatMessage({
                  id: 'screens.profile.editNickname',
                  defaultMessage: 'nickname'
                })}
                className={loginFromInput}
                {...register('nickname')}
              />
            </FormItem>

            <div className="flex justify-center pt-20">
              <LoginButton>
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
    </Modal>
  )
}

export default EditNickNameModal
