interface SubtitleProps {
  text: string;
}

const Subtitle = ({ text }: SubtitleProps) => {
  return <span className="text-sm text-gray-500">{text}</span>;
};

export default Subtitle;
