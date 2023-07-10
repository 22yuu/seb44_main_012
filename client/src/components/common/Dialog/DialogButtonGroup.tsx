type Props = {
  children: React.ReactNode;
};

const DialogButtonGroup = ({ children }: Props) => {
  return <div className="flex justify-end gap-2">{children}</div>;
};

export default DialogButtonGroup;
