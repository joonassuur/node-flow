interface Props {
  handleReset: () => void;
  handleRunWorkflow: () => void;
}

function ButtonsBar({ handleReset, handleRunWorkflow }: Props) {
  return (
    <div className="w-full flex justify-end mb-4">
      <button className="bg-blue-400 text-white mr-2" onClick={handleReset}>
        Reset
      </button>
      <button className="bg-red-400 text-white" onClick={handleRunWorkflow}>
        Run workflow
      </button>
    </div>
  );
}

export default ButtonsBar;
