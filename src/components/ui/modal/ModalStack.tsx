import {AnimatePresence} from 'framer-motion'
import {useAtomValue} from 'jotai'

import {modalStackAtom} from '@/store/modalStack'

import {Modal} from './Modal'

export function ModalStack() {
	const modalStack = useAtomValue(modalStackAtom)

	return (
		<AnimatePresence>
			{modalStack.map((modal, index) => (
				<Modal key={modal.id} index={index} id={modal.id}>
					{modal.content}
				</Modal>
			))}
		</AnimatePresence>
	)
}
