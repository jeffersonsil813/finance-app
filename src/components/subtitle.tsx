interface SubtitleProps {
  text: string;
}

const Subtitle = ({ text }: SubtitleProps) => {
  return <span className="text-sm text-gray-subtitle">{text}</span>;
};

export default Subtitle;
