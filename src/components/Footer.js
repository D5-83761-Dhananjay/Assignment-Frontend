const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <p>{new Date().getFullYear()}</p>
      </div>
    </footer>
  );
};

export default Footer;
