import React, { MutableRefObject, ReactNode, forwardRef } from "react";
import { Modalize } from "react-native-modalize";

interface BottomSheetRenderProps {
  triggerText: string;
  children: ReactNode;
  modalizeRef: MutableRefObject<null>;
}

const BottomSheetRender = forwardRef<Modalize, BottomSheetRenderProps>(
  ({ children }, modalizeRef) => {
    return (
      <>
        <Modalize ref={modalizeRef}>{children}</Modalize>
      </>
    );
  }
);

export default BottomSheetRender;
