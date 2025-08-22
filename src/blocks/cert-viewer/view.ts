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
	/* Loading state */
	isLoading: boolean;
}

interface Cert {
	/* URL to file with certificate */
	certUrl: string;
}

interface State {
	/* Currently displayed certificate */
	url: string;
}

GlobalWorkerOptions.workerSrc =
	'https://unpkg.com/pdfjs-dist@5.4.54/legacy/build/pdf.worker.min.mjs';

export const { state, actions, callbacks } = store( 'scg/cert-viewer', {
	state: {} as State,
	callbacks: {
		*loadDocument( url: string ) {
			const ctx = getContext< CertViewer >();
			const ref = getElement().ref as HTMLElement;
			const loadingTask: PDFDocumentLoadingTask =
				yield getDocument( url );

			ctx.isLoading = true;
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
		handleUrlChange: () => {
			if ( state.url ) {
				callbacks.loadDocument( state.url );
			}
		},
	},
	actions: {
		*display() {
			const ctx = getContext< CertViewer >();
			const { page, canvas, canvasContext } = ctx;
			const viewport = callbacks.getViewport( page );
			const { width, height } = viewport;

			canvas.height = height;
			canvas.width = width;

			yield page.render( {
				canvas,
				canvasContext,
				viewport,
			} );

			ctx.isLoading = false;
		},
		// Triggered by wp-block-cert.
		onCertClick: () => {
			const { certUrl } = getContext< Cert >();

			if ( certUrl ) {
				state.url = certUrl;
			}
		},
	},
} );
