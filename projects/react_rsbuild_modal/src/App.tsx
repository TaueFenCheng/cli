import { JSX, ReactNode, useState } from "react";
import "./App.css";
import { createPortal } from "react-dom";
import { createRoot } from "react-dom/client";

const App = () => {
  const renderModal = (id: string = "modal") => {
    const [modalInstance, setModalInstance] = useState<any>();
    const open = (node: JSX.Element | ReactNode) => {
      if (node) {
        const container = document.getElementById(id);
        const root = createRoot(container as HTMLElement);
        setModalInstance(root);
        //! todo  弹窗实现
        const uu = createPortal(
          node,
          document.getElementById(id) as HTMLElement
        );
        //! 渲染组件
        root.render(uu);
      }
    };
    const destroy = () => {
      if (modalInstance) {
        modalInstance.unmount();
      }
    };

    return {
      open,
      destroy,
    };
  };

  const Modal = renderModal();

  return (
    <div className="content">
      <h1
        style={{ cursor: "pointer" }}
        onClick={() => Modal.open(<>nihaojasjdasdas</>)}
      >
        Rsbuild with React
      </h1>
      <div onClick={Modal.destroy} style={{ cursor: "pointer" }}>
        销毁
      </div>
      <p>Start building amazing things with Rsbuild.</p >
      {/* modal 容器 */}
      <div className="modal" id="modal"></div>
    </div>
  );
};

export default App;