const AddTrip = ({ ...rest }) => {
  return (
    <button className="add-trip" {...rest}>
      <h2>+</h2>
      <h3>Add Trip</h3>
    </button>
  );
};

export default AddTrip;
