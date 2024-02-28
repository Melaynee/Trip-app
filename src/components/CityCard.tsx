import { getCity } from "../tools/getCity";

interface CityCardProps {
  city: string;
  firstDay: string;
  lastDay: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const CityCard: React.FC<CityCardProps> = ({
  city,
  firstDay,
  lastDay,
  ...rest
}) => {
  const cityImage = getCity(city)!.image;
  return (
    <div className="city-card" {...rest}>
      <img src={cityImage} alt={city} />
      <div className="city-info">
        <h6>{city}</h6>
        <p>
          {firstDay} - {lastDay}
        </p>
      </div>
    </div>
  );
};

export default CityCard;
