import { useBlockProps } from '@wordpress/block-editor';
import Badge from './badge';

export default () => {
	const blockProps = useBlockProps();

	return (
		<div { ...blockProps }>
			<Badge />
		</div>
	);
};
