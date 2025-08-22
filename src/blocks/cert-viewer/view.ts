import type {
	PDFDocumentProxy,
	PDFPageProxy,
	PDFDocumentLoadingTask,
} from 'pdfjs-dist';
import { getContext, getElement, store } from '@wordpress/interactivity';
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { getDocument, GlobalWorkerOptions } from 'pdfjs';

interface CertViewer {
	/* PDFJS document object */
	pdf: PDFDocumentProxy;
	/* PDFJS page object */
	page: PDFPageProxy;
	/* Canvas HTML element */
	canvas: HTMLCanvasElement;
	/* Canvas Context */
	canvasContext: CanvasRenderingContext2D;
}

const PDF = 'https://scg.local/wp-content/uploads/2025/08/6164540.pdf';

GlobalWorkerOptions.workerSrc =
	'https://unpkg.com/pdfjs-dist@5.4.54/legacy/build/pdf.worker.min.mjs';

const { actions, callbacks } = store( 'scg/cert', {
	callbacks: {
		*loadDocument() {
			const ctx = getContext< CertViewer >();
			const ref = getElement().ref as HTMLElement;
			const loadingTask: PDFDocumentLoadingTask =
				yield getDocument( PDF );

			ctx.pdf = yield loadingTask.promise;
			ctx.canvas = ref.querySelector( 'canvas' ) as HTMLCanvasElement;
			ctx.canvasContext = ctx.canvas.getContext(
				'2d'
			) as CanvasRenderingContext2D;

			yield callbacks.loadPage();
		},
		*loadPage( pageNumber = 1 ) {
			const ctx = getContext< CertViewer >();
			ctx.page = yield ctx.pdf.getPage( pageNumber );

			yield actions.display();
		},
		getViewport: ( page: PDFPageProxy ) => {
			const ref = getElement().ref as HTMLElement;
			const { width } = page.getViewport( { scale: 1 } );
			const scale = ref.clientWidth / width;

			return page.getViewport( { scale } );
		},
	},
	actions: {
		*display() {
			const { page, canvas, canvasContext } = getContext< CertViewer >();
			const viewport = callbacks.getViewport( page );
			const { width, height } = viewport;

			canvas.height = height;
			canvas.width = width;

			yield page.render( {
				canvas,
				canvasContext,
				viewport,
			} );
		},
	},
} );
