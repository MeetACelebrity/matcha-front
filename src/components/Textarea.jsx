import React from 'react';

import Input from './Input.jsx';

export default function TextArea(props) {
    return <Input {...props} textarea={true} />;
}
