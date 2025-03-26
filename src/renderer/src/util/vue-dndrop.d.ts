declare module 'vue-dndrop' {
  import { type DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type TmpAny = any

  interface DropResult {
    removedIndex: number
    addedIndex: number
    payload: Payload
    element: Element
  }

  interface DragEvent {
    payload: Payload
    isSource: boolean
    willAcceptDrop: boolean
  }

  type Payload = TmpAny

  interface NodeDescription {
    value: string
    props: Record<string, TmpAny>
  }

  interface DraggableProps {
    dragNotAllowed?: boolean
    tag?: string | NodeDescription
  }

  interface ContainerProps {
    dragStart?: (dragEvent: DragEvent) => void
    dragEnd?: (dragEvent: DragEvent) => void
    dragEnter?: () => void
    dragLeave?: () => void
    dragReady?: (dropResult: DropResult) => void
    drop?: (dropResult: DropResult) => void
    dropNotAllowed?: (dropResult: { payload: TmpAny; container: TmpAny }) => void

    getChildPayload?: (index: number) => Payload
    shouldAnimateDrop?: (sourceContainerOptions: ContainerProps, payload: Payload) => boolean
    shouldAcceptDrop?: (sourceContainerOptions: ContainerProps, payload: Payload) => boolean
    getGhostParent?: () => Element

    orientation: 'horizontal' | 'vertical'
    behaviour: 'move' | 'copy' | 'drop-zone' | 'contain'
    tag?: string | NodeDescription
    groupName?: string
    lockAxis?: 'x' | 'y'
    dragHandleSelector?: string
    nonDragAreaSelector?: string
    dragBeginDelay?: number
    animationDuration?: number
    autoScrollEnabled?: boolean
    dragClass?: string
    dropClass?: string
    removeOnDropOut?: boolean
    dropPlaceholder?:
      | boolean
      | {
          className: string
          animationDuration: number
          showOnTop: boolean
        }
    fireRelatedEventsOnly?: boolean
  }

  const Draggable: DefineComponent<DraggableProps>

  const Container: DefineComponent<ContainerProps>

  export { Container, DragEvent, Draggable, DropResult }
}
