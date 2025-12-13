import { useBlockProps } from '@wordpress/block-editor';
import Badge from './badge';

export default () => {
	const blockProps = useBlockProps.save();

	return (
		<div { ...blockProps }>
			<Badge />
		</div>
	);
};
