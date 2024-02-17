import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function BasicButtonExample() {
  return (
    <DropdownButton id="dropdown-basic-button" title="More">
      <Dropdown.Item href="/">Home</Dropdown.Item>
      <Dropdown.Item href="/about">About Us</Dropdown.Item>
      <Dropdown.Item href="/contact">Contact Us</Dropdown.Item>
    </DropdownButton>
  );
}

export default BasicButtonExample;